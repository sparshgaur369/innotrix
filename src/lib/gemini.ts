import { generate } from 'node_modules/@langchain/core/dist/utils/fast-json-patch';
// import { usePathname } from 'next/navigation';
import {GoogleGenerativeAI} from '@google/generative-ai'
import { Document } from '@langchain/core/documents'

const genAI = new GoogleGenerativeAI('AIzaSyA2D98atPs50erZit9zP2iLlFiP0AX4Osg')
const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash'
})



export const aiSummariseCommit = async (diff: string) => {
    const response = await model.generateContent([
        `You are an expert programmer, and you are trying to summarize a git diff. 
Reminders about the git diff format:
For every file, there are a few metadata lines, like (for example):
\`\`\`
diff --git a/lib/index.js b/lib/index.js
index oaof691..bfef603 100644
--- a/lib/index.js
+++ b/lib/index.js
\`\`\`
This means that 'lib/index.js' was modified in this commit. Note that this is only an example.
Then there is a specifier of the lines that were modified.
A line starting with '+' means it was added.
A line that starting with '-' means that line was deleted.
A line that starts with neither '+' nor '-' is code given for context and better understanding.
It is not part of the diff.
[...]
EXAMPLE SUMMARY COMMENTS:
\`\`\`
- Raised the amount of returned recordings from '10' to '100' [packages/server/recordings_api.ts], [packages/server/constants.ts]
- Fixed a typo in the github action name [.github/workflows/apt-commit-summarizer.yml]
- Moved the 'octokit' initialization to a separate file [src/octokit.ts], [src/index.ts]
- Added an OpenAI API for completions [packages/utils/apis/openai.ts]
- Lowered numeric tolerance for test files
\`\`\`
Most commits will have less comments than this examples list.
The last comment does not include the file names.
because there were more than two relevant files in the hypothetical commit.
Do not include parts of the example in your summary.
It is given only as an example of appropriate comments.`,

        `Please summarise the following diff file: \n\n${diff}.`
    ]);

    return response.response.text();
}


export async function summariseCode(doc: Document) {
    console.log("getting summary for", doc.metadata.source);
    try {

        const code = doc.pageContent.slice(0, 10000);
    
    const response = await model.generateContent([
        `You are an intelligent senior software engineer who specializes in onboarding junior software engineers onto projects. 
        You are onboarding a junior software engineer and explaining to them the purpose of the ${doc.metadata.source} file.
        Here is the code:
        ${code}

        Give a summary no more than 100 words of the above code.`
    ]);

    // Optional: return the response if needed
    // return response;
    return response.response.text()
        
    } catch (error) {
        return ''
    }
    
}

export async function generateEmbedding(summary: string){
    const model = genAI.getGenerativeModel({
        model: "text-embedding-004"
    })
    const result = await model.embedContent(summary)
    const embedding = result.embedding
    return embedding.values
}

// console.log(await generateEmbeddings("Hello world"))


// console.log(await summariesCommit(`
//     diff --git a/blog.html b/blog.html
// index 64b89c8..376d09d 100644
// --- a/blog.html
// +++ b/blog.html
// @@ -407,15 +407,7 @@
//                      </div>
//                  </div>
//              </div>
// -            <div class="row">
// -                <div class="col-lg-12 text-center">
// -                    <div class="copyright-text">
// -                        <p><!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
// -  Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with <i class="fa fa-heart" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib</a>
// -  <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --></p>
// -                    </div>
// -                </div>
// -            </div>
// +
//          </div>
//      </section>
//      <!-- Footer Section End -->
// @@ -445,5 +437,5 @@
 
//  </body>
 
// -</html>
// \\ No newline at end of file
// +</html>
// +`));
