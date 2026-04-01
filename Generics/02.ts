// Data will always be an object and default value will be this
type ApiResponse<Data extends object = { status: number }> = {
  data: Data;
  isError: boolean;
};

type UserResponse = ApiResponse<{ name: string; age: number }>;
type BlogResponse = ApiResponse<{ title: string }>;

const responseUser: UserResponse = {
  data: { name: "Raquib", age: 28 },
  isError: false,
};

const responseBlog: BlogResponse = {
  data: { title: "New blog" },
  isError: false,
};

const normalResponse: ApiResponse = {
  data: { status: 403 },
  isError: true,
};
