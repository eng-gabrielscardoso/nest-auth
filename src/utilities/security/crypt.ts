import * as bcrypt from 'bcrypt';

export async function encrypt(password: string, saltOrRounds = 10) {
  return await bcrypt.hash(password, saltOrRounds);
}

export async function decrypt(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}
