import { writeFile } from "fs";
import { join } from "path";

class Download {
  private data: String;
  constructor() {
    this.data = ''
  }

  setDownload(data: string) {
    this.data = data;
    localStorage.setItem(data, `chat-at-${Date.now().toString()}.json`);
  }
  getDownload(data: string) {
    this.data = data;
    localStorage.setItem(data, `chat-at-${Date.now().toString()}.json`);
  }

  import(){

  }
  async export() {
    const fileName = `chat-at-${Date.now().toString()}.json`;
    const filePath = join(__dirname, fileName);
    try {
      await writeFile(filePath, this.data, 'utf8'); // problem here
      console.log(`Data exported to ${filePath}`);
    } catch (error) {
      console.error('Failed to export file:', error);
    }
  }
}


export const localStore = new Download()