export class Client {
  constructor(
    age,
    birthDate,
    cpf,
    creationDate,
    email,
    name,
    messages,
    photoUrl,
    republicId,
  ) {
    this.age = age;
    this.birthDate = birthDate;
    this.cpf = cpf;
    this.creationDate = creationDate;
    this.email = email;
    this.name = name;
    this.photoUrl = photoUrl;
    this.republicId = republicId;
    this.messages = messages;
  }

  static parseFromJSON(clientJSON) {
    return new Client(...clientJSON);
  }
}
