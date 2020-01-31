import React, { useState, useEffect } from "react";
import { Pack } from "@potion/layout";
import { Svg, Circle } from "@potion/element";

const Bubbles = ({ colors }) => {
  const [bubbleData, setBubbleData] = useState([]);
  useEffect(() => {
    const generateBubbleData = colors.map((_, i) => ({
      value: Math.floor(Math.random() * (colors.length * 2)) + 1,
      key: `${i + 1}`
    }));
    setBubbleData(generateBubbleData);
  }, [colors]);

  return (
    <div className="bubble-wrap">
      <p>bubbles</p>
      <Svg width={400} height={400}>
        <Pack
          data={{
            children: bubbleData
          }}
          sum={datum => datum.value}
          size={[400, 400]}
          includeRoot={false}
          nodeEnter={d => ({ ...d, r: 0 })}
          animate
        >
          {nodes =>
            nodes
              .map(({ x, y, r, key }, i) => {
                if (i < colors.length) {
                  return (
                    <Circle
                      key={key}
                      cx={x}
                      cy={y}
                      r={r}
                      fill={colors[i].code.hex}
                    />
                  );
                }
                return null;
              })
              .filter(v => v)
          }
        </Pack>
      </Svg>
    </div>
  );
};

export default Bubbles;

// import React, { useState } from "react";
// import axiosWithAuth from "../utils/axiosWithAuth";

// const initialColor = {
//   color: "",
//   code: { hex: "" }
// };

// const ColorList = ({ colors, setState, state }) => {
//   const [editing, setEditing] = useState(false);
//   const [colorToEdit, setColorToEdit] = useState(initialColor);

//   const editColor = color => {
//     setEditing(true);
//     setColorToEdit(color);
//   };

//   const saveEdit = e => {
//     e.preventDefault();

//     axiosWithAuth()
//       .put(`colors/${colorToEdit.id}`, colorToEdit)
//       .then(res => {
//         setState(!state);
//         console.log("axios res", res);
//       });
//   };

//   console.log("colors data", colors);

//   const deleteColor = color => {
//     axiosWithAuth()
//       .delete(`/colors/${color.id}`)
//       .then(res => {
//         console.log(res);
//         setState(!state);
//       });
//   };

//   return (
//     <div className="colors-wrap">
//       <p>colors</p>
//       <ul>
//         {colors.map(color => (
//           <li key={color.color} onClick={() => editColor(color)}>
//             <span>
//               <span
//                 className="delete"
//                 onClick={e => {
//                   e.stopPropagation();
//                   deleteColor(color);
//                 }}
//               >
//                 x
//               </span>{" "}
//               {color.color}
//             </span>
//             <div
//               className="color-box"
//               style={{ backgroundColor: color.code.hex }}
//             />
//           </li>
//         ))}
//       </ul>
//       {editing && (
//         <form onSubmit={saveEdit}>
//           <legend>edit color</legend>
//           <label>
//             color name:
//             <input
//               onChange={e =>
//                 setColorToEdit({ ...colorToEdit, color: e.target.value })
//               }
//               value={colorToEdit.color}
//             />
//           </label>
//           <label>
//             hex code:
//             <input
//               onChange={e =>
//                 setColorToEdit({
//                   ...colorToEdit,
//                   code: { hex: e.target.value }
//                 })
//               }
//               value={colorToEdit.code.hex}
//             />
//           </label>
//           <div className="button-row">
//             <button type="submit">save</button>
//             <button onClick={() => setEditing(false)}>cancel</button>
//           </div>
//         </form>
//       )}
//       <div className="spacer" />
//       {/* stretch - build another form here to add a color */}
//     </div>
//   );
// };
// export default ColorList;
