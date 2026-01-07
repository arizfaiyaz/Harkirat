import { useState } from "react"
import PostComponent from "./Post.jsx";

function App() {

  return (
    <>
      <div style={{background: "grey", height: "100vh"}}>
        <ToggleMessage />
        <Notification />
        <PostComponent />
        <div style={{
          display: "flex", justifyContent: "left"
        }}>
        <ProfileComponent />
        <Card>
          Hey!! There
        </Card>
        <Card>
          <div style={{color: "white"}}>
          what do you want to post? <br /><br />
          <input type={"text"} />
          </div>
        </Card>
        </div>
      </div>
    </>
  )
}







function Card({ children }){
  return (
    <div style={{background: "black", borderRadius: 10, color: "white", padding: 10, margin: 10}}>
      {children}
    </div>
  )
}


const ToggleMessage = () => {
  let [isVisible, setIsVisible] = useState(true); // this returns an arrayy

  function toggle() {
    setIsVisible(!isVisible);
  }

  return (
    <div>
      <button onClick={toggle}>
        Toggle Message
      </button>
      {isVisible && <p>This message is conditionally rendered!!</p>}
    </div>
  )

}

const Notification = () => {
  let [ notificationCount, setNotificationCount] = useState(0);

  function increment() {
    setNotificationCount(notificationCount + 1);
  }

  return (
    <div>
      <button onClick={increment}>Notification
      </button>
      {notificationCount > 0 && <span>You have {notificationCount} new notifications</span>}
    </div>
  )
}


const style = {
  width: 200,
  backgroundColor: "white",
  borderRadius: 10,
  borderColor: "gray",
  borderWidth: 1.5,
  padding: 20
}

// function PostComponent() {
//   return (
//     <div style={style}>
//     <div style={{display: "flex"}}>
//       <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjxhOxB-AhzpZ5M55ItVi7vEVt__zg0W4-hw&s"} style={{
//         width: 50,
//         height: 50,
//         borderRadius:40,
//       }} />
//     </div>
//     <div style={{fontSize:10, margin: 5}}>
//       <b>
//         100xDevs
//       </b>
//       <div>23,888 followers</div>
//       <div>12M</div>
//     </div>
//     <div>
//         Want to know how to win big? Check out how these folks won $500 in bounties.
//     </div>
//     </div>

//   )

// }

function ProfileComponent() {
  return (
    <>
    <div style={{...style, margin: 20, padding: 20}}>
      <div>
      <img src={"https://media.licdn.com/dms/image/v2/D5603AQGrviB87d0pdw/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1720365156652?e=1763596800&v=beta&t=aK55sUyNvNl9U98al-w9MvgqgSbDPpLtAsC4w5PZP_8"}
      style={{
        width:50,
        height: 50,
        borderRadius: 10,
        display: "flex",
        justifyContent: "center",
        marginBottom:10,
      }}/>
      </div>
      <div>
        <b>
          Ariz Faiyaz
        </b>
        <div>Profile Views: 23000</div>
      </div>
    </div>
    </>
  )
}


export default App
// structuring ur app into components
// defining a state of your application
