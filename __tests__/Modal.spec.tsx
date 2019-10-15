import React from "react";
import ReactDOM from 'react-dom'
import { create } from "react-test-renderer";
import Modali, { useModali} from "../src/index";

/* Temporary workaround until portals is suported by 'react-test-renderer' */
ReactDOM.createPortal = node => node;

const App = () => {
    const [exampleModal, toggleExampleModal] = useModali();

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
