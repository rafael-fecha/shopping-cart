interface ModalsTemplates {
  removeDeviceConfirmation: string;
}

const modalsTemplates: ModalsTemplates = {
  removeDeviceConfirmation: "remove-device-confirmation"
};

export class ModalManager {
  private modals: any[];

  constructor() {
    this.modals = [];
  }

  add(modal: any) {
    this.modals.push(modal);
  }

  close(id: string) {
    const modal = this.findWhere(this.modals, { id: id });
    modal.close();
  }

  findWhere(array, criteria) {
    return array.find(item =>
      Object.keys(criteria).every(key => item[key] === criteria[key])
    );
  }

  getModalTemplates(): ModalsTemplates {
    return modalsTemplates;
  }

  open(id: string) {
    const modal = this.findWhere(this.modals, { id: id });
    modal.open();
  }

  remove(id: string) {
    this.modals = this.modals.filter(m => m.id !== id);
  }
}
