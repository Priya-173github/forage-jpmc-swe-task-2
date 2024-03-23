export interface Order {
  price: Number,
  size: Number,
}
/**
 * The datafeed server returns an array of ServerRespond with 2 stocks.
 * We do not have to manipulate the ServerRespond for the purpose of this task.
 */
export interface ServerRespond {
  stock: string,
  top_bid: Order,
  top_ask: Order,
  timestamp: Date,
}

class DataStreamer {
  // The url where datafeed server is listening
  static API_URL: string = 'http://localhost:5500/query?id=1';

  /**
   * Send request to the datafeed server and executes callback function on success
   * @param callback callback function that takes JSON object as its argument
   */
  static getData(callback: (data: ServerRespond[]) => void): void {
    const request = new XMLHttpRequest();
    request.open('GET', DataStreamer.API_URL);

    request.onload = () => {
      if (request.status == 200) {
        try {
          const data = JSON.parse(request.responseText);
          callback(data);
        }
        catch (error) {
          console.error('Error parsing json:', error);
          alert('error parsing json');
        }
      } else {
        alert('Request failed');
      }
    };

    request.send();
  }
}

export default DataStreamer;