import fs from "fs"
const path = './data.json'; // Caminho para o arquivo JSON

function verificaID(id){
  var file = fs.readFileSync(path, { encoding: 'utf8', flag: 'r' })
  file = JSON.parse(file)
  var teste = file.find(item => item === id)
  if (teste) return false
  return file
}

export function salvarId(dados) {
  var file = verificaID(dados.ID)
  if(file){
    file.push(dados.ID)
    const save = fs.writeFileSync(path, JSON.stringify(file), {flag: 'w' })
    return dados
  }
}

