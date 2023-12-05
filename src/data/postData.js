
import { v4 } from "uuid";
import img from './../assets/post_img.png'
const postData =[{
    id:v4(),
    postName: "Galapagos Islands, Ecuadorys",
    postDesc: 'The Galápagos Islands is a volcanic archipelago in the Pacific Ocean. It considered one of the worlds foremost destinations for wildlife-viewing. A province of Ecuador, it lies about 1,000km off its coast. Its isolated terrain shelters a diversity of plant and animal species, many found nowhere else.',
    postImage:img,
    boardId:'2264526e-0a86-4bbc-b23f-8d75fd11416d',
    createdAt : Date(),
},

]


export default postData;