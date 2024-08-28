import {
  CognitoUserPool,
  CognitoUserAttribute,
  ISignUpResult,
  AuthenticationDetails,
  CognitoUser,
} from "amazon-cognito-identity-js";

interface SignUpParams {
  email: string;
  password: string;
  name: string; // custom:name 속성
  role: string; // custom:role 속성
  studentId: string; // custom:student_id 속성
  onSuccess: (result: ISignUpResult) => void;
  onFailure: (error: Error) => void;
}

interface AuthResponse {
  idToken: string;
  name: string; // 사용자의 이름
  role: string; // 사용자의 역할
  studentId: string; // 학생 ID
}

interface VerifyEmailParams {
  username: string; // 이메일 주소
  code: string; // 사용자로부터 받은 인증 코드
}

const USER_POOL_ID = process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID;
const CLIENT_ID = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID;

if (!USER_POOL_ID || !CLIENT_ID) {
  throw new Error(
    "Cognito credentials are not properly set in the environment variables."
  );
}

const poolData = {
  UserPoolId: USER_POOL_ID,
  ClientId: CLIENT_ID,
};

const userPool = new CognitoUserPool(poolData);

export function signUp({
  email,
  password,
  name,
  role,
  studentId,
  onSuccess,
  onFailure,
}: SignUpParams): void {
  const username = email;
  const attributeList = [
    new CognitoUserAttribute({
      Name: "email",
      Value: email,
    }),
    new CognitoUserAttribute({
      Name: "custom:name",
      Value: name,
    }),
    new CognitoUserAttribute({
      Name: "custom:role",
      Value: role,
    }),
    new CognitoUserAttribute({
      Name: "custom:student_id",
      Value: studentId,
    }),
  ];

  userPool.signUp(username, password, attributeList, [], (err, result) => {
    if (err) {
      onFailure(err);
      return;
    }
    if (result) {
      onSuccess(result);
    }
  });
}

export function authenticateCognitoUser(
  email: string,
  password: string
): Promise<AuthResponse> {
  const authenticationDetails = new AuthenticationDetails({
    Username: email,
    Password: password,
  });

  const userData = {
    Username: email,
    Pool: userPool,
  };

  const cognitoUser = new CognitoUser(userData);
  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        const idToken = result.getIdToken().getJwtToken();
        const claims = result.getIdToken().decodePayload();

        // custom 속성 가져오기
        const name = claims["custom:name"] || "";
        const role = claims["custom:role"] || "";
        const studentId = claims["custom:student_id"] || "";

        resolve({
          idToken,
          name,
          role,
          studentId,
        });
      },
      onFailure: (err) => {
        reject(err);
      },
    });
  });
}

export function verifyEmail({
  username,
  code,
}: VerifyEmailParams): Promise<void> {
  const userData = {
    Username: username,
    Pool: userPool,
  };

  const cognitoUser = new CognitoUser(userData);

  return new Promise((resolve, reject) => {
    cognitoUser.confirmRegistration(code, true, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}
