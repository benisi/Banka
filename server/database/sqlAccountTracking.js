import SqlModel from './sqlModel';

class Tracking extends SqlModel {
  static init() {
    const structure = ['type'];
    const trackingInstance = new Tracking(structure);
    return trackingInstance;
  }
}

export default Tracking;
