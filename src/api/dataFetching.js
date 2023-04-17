import axios from "axios";

export const _dataFetching = async () => {


  try {
    const request = await axios.get("https://jsonplaceholder.typicode.com/users");
    if(request.status === 200){
        return {data:request.data,status:200};

    }else {
        throw new Error(request.message)
    }

  } catch (error) {
    return error
  }
};
