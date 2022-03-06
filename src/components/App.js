import React, { useEffect, useState } from "react";
import Web3 from "web3";
import SocialNetwork from "./../abis/SocialNetwork.json";
import "./style.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CreatePost from "./CreatePost/CreatePost";
import AllPost from "./AllPost/AllPost";
import MyPost from "./MyPost/MyPost";
import Navbar from "./Navbar/Navbar";

const App = () => {
  const [account, setAccount] = useState("");
  const [socialCont, setSocialCont] = useState(null);
  const [posts, setPosts] = useState([]);
  const [web3Instance, setWeb3Instance] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [snackBar, setSnackBar] = useState({
    status: false,
    text: "",
  });
  useEffect(() => {
    async function init() {
      // If you have metamask you will able to connect to eth node,
      // no need to pass provider url
      let provider = window.ethereum;
      // chekck user have metamask
      if (typeof provider !== "undefined") {
        // if yes then connect account to our site
        provider
          .request({ method: "eth_requestAccounts" })
          .then((accounts) => {
            setAccount(accounts[0]);
          })
          .catch((e) => console.log(e));
      } else {
        alert("you need to install metamask");
      }
      // now we have web3 instance that we can use to interect with ethereum apis.
      const web3 = new Web3(provider);
      setWeb3Instance(web3);
      console.log(web3.utils.isBN("30", "Ether"));
      // listen for account changes
      provider.on("accountsChanged", function(accounts) {
        setAccount(accounts[0]);
      });
      // add social network contract
      let networkId = await web3.eth.net.getId();
      let socialCont = await new web3.eth.Contract(
        SocialNetwork.abi,
        SocialNetwork.networks[networkId].address
      );
      setSocialCont(socialCont);

      let count = await socialCont.methods.postCount().call();
      console.log(count);
      let posts = [];
      for (let i = 0; i < count; i++) {
        let post = await socialCont.methods.posts(i).call();
        posts.push(post);
      }
      console.log(posts);
      setPosts(posts);
    }
    init();
  }, []);

  const hideSnackBar = (seconds) => {
    setTimeout(() => {
      setSnackBar(false);
    }, seconds * 1000 || 5000);
  };

  const createPost = (content) => {
    setIsLoading(true);
    socialCont.methods
      .createPost(content)
      .send({ from: account })
      .then((res) => {
        setPosts([...posts, res.events.PostCreated.returnValues]);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setSnackBar({
          status: true,
          text: "Not able create post. try again.",
        });
        hideSnackBar();
        setIsLoading(false);
      });
  };

  const tipPost = (id, tipAmount) => {
    socialCont.methods
      .tipPost(id)
      .send({ from: account, value: tipAmount })
      .then(async (res) => {
        let count = await socialCont.methods.postCount().call();
        console.log(count);
        let posts = [];
        for (let i = 0; i < count; i++) {
          let post = await socialCont.methods.posts(i).call();
          posts.push(post);
        }
        console.log(posts);
        setPosts(posts);
        setIsLoading(false);
      })
      .catch((err) => {
        setSnackBar({
          status: true,
          text: "Not able to Tip try again.",
        });
        hideSnackBar();
        setIsLoading(false);
      });
  };

  return (
    <div>
      <Router>
        <Navbar account={account} />
        {isLoading && (
          <div id="loader" className="text-center mt-5">
            <p>Loading...</p>
          </div>
        )}
        {snackBar.status && <div className="snackbar"> {snackBar.text}</div>}{" "}
        <Switch>
          <Route path="/create">
            <CreatePost createPost={createPost} />
          </Route>
          <Route path="/mypost">
            <MyPost posts={posts} />
          </Route>
          <Route path="/" exact>
            <AllPost posts={posts} tipPost={tipPost} instance={web3Instance} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;

// <Main
//           posts={posts}
//           createPost={createPost}
//           tipPost={tipPost}
//           instance={web3Instance}
//         />
