const fs = require('fs');
const path = require('path');

const directory = './src'; // Replace with your directory path
const searchTerm = 'createMany';

function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  });
  return fileList;
}

function findFilesWithoutTerm(dir, term) {
  const files = getAllFiles(dir);
//   const filteredFiles = files.filter((file) => {
//     const content = fs.readFileSync(file, 'utf-8');
//     return !content.includes(term);
//   });

//   filter with file that end with .resolvers.ts and not end with activity.resolvers.ts
    const filteredFiles = files.filter((file) => {
        const content = fs.readFileSync(file, 'utf-8');
        return file.endsWith('resolver.ts') && !content.includes(term);
    });

  return filteredFiles;
}

const result = findFilesWithoutTerm(directory, searchTerm);
console.log('Files without "createMany":', result);

