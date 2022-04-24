import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

const artifactsDirectory = join(process.cwd(), 'content', 'artifacts')

function listDirsWithin(parentDir) {
  return fs.readdirSync(parentDir, {withFileTypes: true})
           .filter(dirent => dirent.name.slice(-3) === ".md" )
           .map(dirent => dirent.name)
}

export function getAllSlugs() {
  return listDirsWithin(artifactsDirectory)
}

export function getArtifactBySlug(artifactDescFilename, fields = []) {
  const cleanSlug = artifactDescFilename.replace(/\.md$/, '')
  const pathToArtifactDesc = join(artifactsDirectory, artifactDescFilename)
  const pieceMarkdown = fs.readFileSync(pathToArtifactDesc, 'utf8')
  const { data, content } = matter(pieceMarkdown)

  const returnData = {}

  // Ensure only the minimal needed data is exposed
  // (homemade GraphQL)

  if (fields.length < 1) {
    console.warn(`getArtifactBySlug called with no fields specified. Returning {}`)
  }

  fields.forEach(field => {
    switch(field) {
      case 'slug':
        returnData[field] = cleanSlug
        break
      case 'body_md':
        returnData[field] = content
        break
      case 'date_lastUpdated':
        const dateLastUploaded = fs.statSync(pathToArtifactDesc).mtime
        returnData[field] = dateLastUploaded ? dateLastUploaded.toJSON() : null
        // TODO: implement proper Git
        break
      case 'date_firstPublished':
        const dateFirstPublished = fs.statSync(pathToArtifactDesc).birthTime
        returnData[field] = dateFirstPublished ? dateFirstPublished.toJSON() : null
        // TODO: implement proper Git
        break
      default:
        // any front matter field
        if (data[field]) {
          returnData[field] = data[field]
        } else {
          console.warn(`Requested field \`${field}\` not defined in ${pathToArtifactDesc} front matter`)
        }
    }
  })

  return returnData
}
