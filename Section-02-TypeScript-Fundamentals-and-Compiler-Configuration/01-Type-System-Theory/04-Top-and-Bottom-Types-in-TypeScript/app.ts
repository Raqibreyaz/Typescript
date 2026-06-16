function parseJson(jsonString: string): unknown {
  return JSON.parse(jsonString);
}

console.log(parseJson('{"username":"raquib","age":45}'));
