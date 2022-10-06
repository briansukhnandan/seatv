"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3002;
// Root route
app.get('/', (req, res) => {
    res.send("Why are you here?");
});
// Listen on port 3002.
app.listen(port, () => {
    console.log(`server running : http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map