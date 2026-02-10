# FlowCraft 🚀

![flowcraft](<Untitled design.gif>)

Hey there!  Welcome to **FlowCraft**.

This is a project designed to make building data pipelines visual, intuitive, and maybe even a little fun. Instead of writing spaghetti code to chain functions together, FlowCraft lets you drag, drop, and connect nodes on an infinite canvas.

Whether you're prototyping an LLM chain, building a data filter logic, or just playing around with visual programming, this is your playground.



## What's under the hood? 

We're using a modern stack to keep things snappy:

- **Frontend**: [React](https://react.dev/) + [React Flow](https://reactflow.dev/) (for the beautiful canvas).
- **Backend**: [FastAPI](https://fastapi.tiangolo.com/) (Python) handles the heavy lifting and validation.
- **State Management**: Zustand (keeps the app fast).



## Features 

- **Drag & Drop Canvas**: Add nodes, connect them with edges, move them around. It's super satisfying.
- **DAG Validation**: The backend automatically checks your pipeline to make sure it's a valid Directed Acyclic Graph (DAG). No infinite loops allowed here! 
- **Diverse Node Library**:
  -  **LLM Node**: Hooks into language models.
  -  **Input/Output**: The entry and exit points of your data.
  -  **Math Node**: Perform calculations on the fly.
  -  **Text Node**: Handle string variables.
  -  **Logic Nodes**: Conditionals (If/Else), Filters, and Mergers to control flow.
  -  **API Node**: Make external requests right from your pipeline.



## Getting Started 

You'll need two terminals open for this (one for the visuals, one for the brains).

### 1. Fire up the Backend 

The backend handles parsing and validation. 

```bash
# From the project root
cd backend

# Install dependencies (virtual env recommended!)
pip install -r requirements.txt

# Start the server
uvicorn main:app --reload
```

You should see it running at `http://localhost:8000`.

### 2. Start the Frontend (FlowCraft) 

This is the folder you're currently reading about.

```bash
# From the FlowCraft directory
npm install
npm start
```

Open `http://localhost:3000` in your browser.

## How to Contribute 

We'd love your help! Whether it's fixing a bug, adding a new node type, or just improving the documentation (meta, I know), contributions are welcome.

Here’s the workflow:

1.  **Fork the repo**: Click that button up top.
2.  **Clone your fork**: Get the code on your machine.
3.  **Branch out**: Create a branch for your changes.
    ```bash
    git checkout -b feature/super-cool-node
    ```
4.  **Make your changes**: Write code, break things, fix them.
5.  **Test it**: Make sure the app still runs!
6.  **Commit**:
    ```bash
    git commit -m "Added a super cool node that does X"
    ```
7.  **Push**:
    ```bash
    git push origin feature/super-cool-node
    ```
8.  **Open a Pull Request**: Go to the original repo and hit "Compare & pull request". Tell us what you did and why it's awesome.

9.  wait for approval


### A few tips for contributors:

- If you're adding a **new node**, make sure to create the component in `src/nodes/` and register it in `src/nodes/index.js` key mappings.
- Keep the style consistent (we like clean code!).
- Be nice in the comments. We're all learning here.
  

---

_Happy Building!_
