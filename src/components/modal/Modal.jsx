const { Component } = require('react');

class Modal extends Component {
  closeModal = e => {
    if (e.code === 'Escape') this.props.toggleModal();
    if (e.target === e.currentTarget) this.props.toggleModal();
  };

  componentDidMount() {
    document.addEventListener('keydown', this.closeModal);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.closeModal);
  }

  render() {
    return (
      <div className="Overlay" onClick={this.closeModal}>
        <div className="Modal">
          <img src={this.props.imgURL} alt={this.props.imgAlt} />
        </div>
      </div>
    );
  }
}

export default Modal;
