
function App() {

  return (
    <>
      <div style={{background: "#dfe6e9", height: "100vh"}}>
        <div style={{display: "flex", justifyContent: "center"}}>
        <PostComponent />
        </div>
      </div>
    </>
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

function PostComponent() {
  return (
    <>
    <div style={style}>
    <div style={{display: "flex"}}>
      <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjxhOxB-AhzpZ5M55ItVi7vEVt__zg0W4-hw&s"} style={{
        width: 50,
        height: 50,
        borderRadius:40,
        display: "flex"
      }} />
    </div>
    <div style={{fontSize:10, margin: 5}}>
      <b>
        100xDevs
      </b>
      <div>23,888 followers</div>
      <div>12M</div>
    </div>
    <div>
        Want to know how to win big? Check out how these folks won $500 in bounties.
    </div>
    </div>
    </>
  )

}

export default App
// structuring ur app into components
// defining a state of your application
