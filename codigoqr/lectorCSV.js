document.getElementById('fileInput').addEventListener('change', function(evt) {
    let file = evt.target.files[0];
    let reader = new FileReader();
    
    reader.onload = function(e) {
      let text = e.target.result;
      let lines = text.replace(/\r/g, '').split('\n');
      let headers = lines[0].split(';'); 
      let data = [];
      
      for (let i = 1; i < lines.length; i++) {
        let values = lines[i].split(';');
        let entry = {};
        
        for (let j = 0; j < headers.length; j++) {
          entry[headers[j]] = values[j];
        }
        
        data.push(entry);
      }
      
      var outputElement = document.getElementById('output');
      var jsonString = JSON.stringify(data, null, 2);
      outputElement.textContent = jsonString;
    };
    
    reader.readAsText(file);
  });