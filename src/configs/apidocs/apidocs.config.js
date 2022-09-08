import YAML from "yamljs";
import path from "path";
import swaggerUi from "swagger-ui-express";


function swaggerConfig(app, pathDocs, apiVesion) {
    
    const filePath = path.join(__dirname, `api_docs_${apiVesion}.yaml`);
    // const filePath = path.join(__dirname, `api_docs.yaml`);
    const swaggerDocs = YAML.load(filePath);
    app.use(pathDocs, swaggerUi.serve, swaggerUi.setup(swaggerDocs));
    console.log(`Ready api docs at: http://localhost:3000${pathDocs}`);
}

export default swaggerConfig;