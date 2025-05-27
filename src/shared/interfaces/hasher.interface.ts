export interface Hasher {
  hash(data: string): Promise<string>;

  compare(data: string, hashed: string): Promise<boolean>;
}
