'use client'

import { useState } from "react";
import Card from "@/components/Card";
import ModalCarrinho from "@/components/ModalCarrinho";
import { FaShoppingCart } from "react-icons/fa"
import Itens from "@/components/Itens";

export default function Home() {

  //ADD ITENS NO CARRINHO (IDs)
  const [idsCartItens, setIdsCartItens] = useState([]);
  const addCarrinho = (itemId) => {
    setIdsCartItens([...idsCartItens, itemId]);
  };

  //REMOVER ITENS DO CARRINHO
  const removerCarrinho = (itemId) => {
    setIdsCartItens([...idsCartItens.filter((item) => item !== itemId)]);
  };

  //ABRIR E FECHAR MODAL
  const [isOpen, setIsOpen] = useState(false)
  function closeModal() {
    setIsOpen(false)
  }
  function openModal() {
    setIsOpen(true)
  }
    
  return (
    <main>
      {/* CABEÇALHO */}
      <div className="w-full">
        <div className="relative flex flex-col items-center ">
          <img className="object-cover w-full h-[456px]" src="../imgs/bg.png" />
          <div className="absolute mt-[51px]">
            <div className="flex flex-col gap-4 items-center text-[#FFFFFF]">
              <img className="object-cover h-[185px] w-[185px] rounded-full" src="../imgs/bg-pop.png"></img>
              <h1 className="font-bold text-[28px]">Red Burguer</h1>
              <p className="font-roboto font-medium text-[16px]">Rua dev sucesso, 12, Campo Grande, MS</p>
              <p className="flex justify-center items-center font-roboto font-bold w-[256px] h-[43px] rounded-[4px] text-[18px] bg-[#54CC0A]">Seg á Dom - 18:00 as 22:00</p>
            </div>
          </div>
        </div>
      </div>

      {/* TEXTO CENTRAL */}
      <div className="py-10">
        <h1 className="text-center text-[24px] font-roboto font-bold text-[#000000] sm:text-[34px]">Conheça nosso menu</h1>
      </div>

      {/* CARDS */}
      <div className="w-full flex justify-center">
        <div className="grid grid-cols-1 xl:grid-cols-2 pb-20 gap-5">
          {/* MAPEAR TODOS OS CARDS QUE ESTÃO EM components/Itens.js */}
          {Itens().map((item) => (
            <Card 
              key={item.id}
              idItem={item.id}
              imagem={item.imagem}
              titulo={item.titulo}
              texto={item.texto}
              preco={item.preco}
              addCarrinho={addCarrinho}
            /> 
          ))}
        </div>
      </div>

      {/* RENDERIZAÇÃO DO MODAL CARRINHO */}
      <ModalCarrinho openModal={isOpen} closeModal={closeModal} idsItensCarrinho={idsCartItens} remover={removerCarrinho}/>
      
      {/* RODAPÉ (FIXO) */}
      <div className="fixed bottom-0 left-0 right-0 flex items-center justify-center h-[60px] bg-[#FF3131] text-[#FFFFFF]">
        <button onClick={openModal} className="flex flex-row items-center gap-[8px]">
          <p className="font-roboto font-bold text-[14px]">( {idsCartItens.length} ) Veja seu carrinho</p>
          <FaShoppingCart className="w-[25px] h-[25px]" />
        </button>
      </div>
    </main>   
  );
}
