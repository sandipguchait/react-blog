import Axios from 'axios';
import config from '../../config/index';
import CreateArticle from '.';

// ALL ARTICLE HELPER FUNCTIONS HERE

     const getCategories = async ()=> {
        const response = await Axios.get(`${config.apiUrl}/categories`);
        return response.data.categories;
    }


     export const ArticleUpload = async( data, token)=>{
         console.log(data, token)
        const image = await uploadToCloudinary(data.image);

        try {
            const response = await Axios.post(`${config.apiUrl}/articles`, {
                title: data.title,
                content: data.content,
                category_id: data.categories,
                imageUrl: image.secure_url,
    
            },{
                headers: {
                    Authorization:`Bearer${token}`,
                }
            });
            console.log(response.data);
            return response.data;

        } catch(errors) {
            console.log(errors)
            return errors.response.data
        }
    }

   export const uploadToCloudinary =(image)=> {
        const form = new FormData();
        form.append('file', image );
        form.append('upload_preset','xbzr7tj6')

        Axios.post('https://api.cloudinary.com/v1_1/xjailbreak/image/upload', form)
        .then((response)=>{
            console.log(response)
            return response.data
        }).catch(error => {
            console.log(error)
        })

    }

    export default getCategories;