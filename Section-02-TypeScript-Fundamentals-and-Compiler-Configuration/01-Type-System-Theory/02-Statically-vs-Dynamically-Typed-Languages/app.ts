type ApiUser = {
  id: string;
  email: string;
};

type User = {
  id: string;
  email: string;
};

function sendEmail(user: ApiUser) {
  return user.email.toLowerCase();
}

sendEmail({ id: "xyz" });
