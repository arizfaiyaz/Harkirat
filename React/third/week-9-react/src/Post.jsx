const style = {width: 200, backgroundColor: "white", borderColor: "grey", borderRadius: 10, borderWidth: 1, padding: 20};

export default function PostComponent({name, subtitle, time, image, description}) {
    return (
        <div style={style}>
            <div style={{display: "flex"}}>
                <img src={image} style={{
                    width: 30,
                    height: 30,
                    borderRadius: 20,
                }} />
                <div style={{fontSize: 10, marginLeft: 10}}>
                    <b>
                        {name}
                    </b>
                    <div>{subtitle}</div>
                    {time !== undefined && <div style={{display: "flex"}}>
                        <div>{time}</div>
                    </div>}
                </div>
            </div>
            <div>
                {description}
            </div>
        </div>
    )
}