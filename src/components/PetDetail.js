import React, { useState } from "react";
import petsData from "../petsData";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { deletePet, getOnePet } from "../api/pets";
import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
const PetDetail = () => {
  const { petId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  // const [pet, setPets] = useState({});
  //const handelGetPet = async () => {
  // const response = await getOnePet(petId);
  //setPets(response);
  // };

  //const pet = petsData.find((pet) => {
  // return pet.id == petId;
  // });
  //<button onClick={handelGetPet}> fetch2</button>

  const { data: pet, isLoading } = useQuery({
    queryKey: ["details", petId],
    queryFn: () => getOnePet(petId),
  });

  if (isLoading) return <h1> loading !!!!</h1>;

  const { mutate } = useMutation({
    mutationKey: ["deletePet"],
    mutationFn: () => deletePet(petId),
    onSuccess: () => {
      navigate("/pets");
    },
  });
  return (
    <div className="bg-[#F9E3BE] w-screen h-[100vh] flex justify-center items-center">
      <div className="border border-black rounded-md w-[70%] h-[70%] overflow-hidden flex flex-col md:flex-row p-5">
        <div className="h-full w-full md:w-[35%]">
          <img
            src={pet.image}
            alt={pet.name}
            className="object-contain w-full h-full"
          />
        </div>
        <div className="w-full md:w-[65%] h-full pt-[30px] flex flex-col p-3">
          <h1>Name: {pet.name}</h1>
          <h1>Type: {pet.type}</h1>
          <h1>adopted: {pet.adopted}</h1>

          <button className="w-[70px] border border-black rounded-md  hover:bg-green-400 mb-5">
            Adobt
          </button>

          <button
            className="w-[70px] border border-black rounded-md  hover:bg-red-400"
            onClick={mutate}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default PetDetail;
