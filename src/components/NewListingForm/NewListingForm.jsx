import React, { Component } from "react";

export default class NewListingForm extends Component {
  state = {
    title: "",
    type: "",
    price: "",
    description: "",
    image: "",
    message: "",
  };

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
      message: "",
    });
  };
  handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const fetchResponse = await fetch("/api/listings/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: this.state.title,
          type: this.state.type,
          price: this.state.price,
          description: this.state.description,
          image: this.state.image,
        }),
      });

      if (!fetchResponse.ok) {
        throw new Error("Fetch failed - Bad request");
      } else {
        this.setState({
          title: "",
          type: "",
          price: "",
          description: "",
          image: "",
          message: "Listing Created Successfully!",
        });
      }
    } catch (err) {
      this.setState({ message: "Failed - Please Try Again" });
    }
  };
  render() {
    return (
      <div>
        <h1>New Listing Page</h1>
        <p className="">&nbsp;{this.state.message}</p>
        <div className="form-container">
          <form autoComplete="off" onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={this.state.title}
              onChange={this.handleChange}
              required
            />
            <select
              name="type"
              onChange={this.handleChange}
              value={this.state.type}
              required
            >
              <option value="">Select Type</option>
              <option value="House">House</option>
              <option value="Condo">Condo</option>
              <option value="Apartment">Apartment</option>
            </select>

            <input
              type="number"
              name="price"
              placeholder="price"
              value={this.state.price}
              onChange={this.handleChange}
              required
            />
            <label>Description</label>
            <textarea
              type="text"
              name="description"
              placeholder="Description"
              value={this.state.description}
              onChange={this.handleChange}
              required
            ></textarea>

            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={this.state.image}
              onChange={this.handleChange}
              required
            />
            <button type="submit">ADD LISTING</button>
          </form>
        </div>
      </div>
    );
  }
}
