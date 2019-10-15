import * as React from "react";
import * as ReactDOM from 'react-dom'
import { create } from "react-test-renderer";
import Modali from "../src/index";

/* Temporary workaround until portals is suported by 'react-test-renderer' */
// @ts-ignore
ReactDOM.createPortal = node => node;

const App = () => {
    return (
        <Modali.Modal isModalVisible hide={() => { }} options={{}}>
        Hi, I'm a Modali!
  </Modali.Modal>)
}

describe("Modali component", () => {
  test("Matches the snapshot", () => {
    const modal = create(<App /> );
    expect(modal.toJSON()).toMatchSnapshot();
  });
});
