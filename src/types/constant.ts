const EmailPattern =
  /^(?!.*[.]{2,})[a-zA-Z0-9.%]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const PhonePattern = /^0[35789][0-9]{8}$/;

const StudentIdPattern = /^[1-9][0-9]{7}$/;

const remoteUrl = "https://realtime-chat-app-api-tbaf.onrender.com";
// const remoteUrl = "http://localhost:7978";

export { EmailPattern, PhonePattern, remoteUrl, StudentIdPattern };
