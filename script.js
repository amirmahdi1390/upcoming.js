let fs = require("fs")
let path = require("path")

let directory = path.join("src")
let routesObject = [
   
]

function folderChecker(folderPath) {

    let folders = fs.readdirSync(folderPath)

    folders.forEach(folder => {

        let fullPath = path.join(folderPath, folder)

        let stat = fs.statSync(fullPath)
        

        if (stat.isDirectory()) {
        
          
            if (!folder.startsWith("_")) {
                
                
            folderChecker(fullPath)
            }

        } else {
            let fileName = path.basename(fullPath).toLowerCase()
            if (fileName == "page.jsx"|| fileName == "page.js") {
              
                let route = `${path.relative("src",path.dirname(fullPath)).replace(/\\/g,"/")}`;
               
                let sp = route.split("/")
                let routes = sp.map((r)=>{
                    if (r.includes("(") && r.includes(")")) {
                        return null
                    }
                    if (r.includes("[")&& r.includes("]")) {
                        let a = `:${r.replace(/\[|\]/g,"")}`
                        return a
                    }else{
                        return r
                    }
                   
                
                }).filter(Boolean)
                let finallr =`/${ routes.join("/")}`
                console.log(finallr);
                
                
                let routeOBJ = {
                    path:finallr,
                    file:fullPath
                }
                routesObject.push(routeOBJ)    

            }
           
            if(fileName == "notfound.js" || fileName == "notfound.jsx" ){
                let filePath = path.dirname(fullPath)
                let rel = path.relative("src",filePath).replace(/\\/g, "/")
               if (rel ==""){
                console.log("notf oun d found");
                
               }
            }
           

        }

    })

}

folderChecker(directory)

console.log(routesObject);
