import { useState } from "react";
import { Drawer } from "./components/Drawer";

function App() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-4">
      <button
        onClick={() => setOpen((p) => !p)}
        className="px-2 py-1 bg-violet-600 text-white rounded-lg active:bg-violet-800"
      >
        Open
      </button>
      <Drawer.Root open={open} onOpen={setOpen}>
        <Drawer.Popover>
          <Drawer.Backdrop />
          <Drawer.Body>
            <Drawer.DragBar className="px-8 py-4">
              <div className="w-20 h-1 bg-neutral-200 rounded-full" />
            </Drawer.DragBar>
            <div>Content</div>
            <div>Content</div>
            <div>Content</div>
            <div>Content</div>
            <div>Content</div>
            <div>Content</div>
            <div>Content</div>
            <div>Content</div>
          </Drawer.Body>
        </Drawer.Popover>
      </Drawer.Root>
    </div>
  );
}

export default App;
