import { writeFile } from "fs";

class Download {
  private data: String;
  constructor() {
    this.data = ''
  }

  setDownload(data: string) {
    this.data = data;
    localStorage.setItem(data, `chat-at-${Date.now().toString()}.json`);
  }

  import(){

  }
  export(){
    
  }
}
