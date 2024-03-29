'use client'

import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import ModalPedidos from './ModalPedidos'
import Itens from './Itens'

export default function ModalCarrinho({openModal, closeModal, idsItensCarrinho, remover}){

  // FILTRO DOS ITENS QUE ESTÃO NO CARRINHO À PARTIR DOS IDs SELECIONADOS
  const itensNoCarrinho = Itens().filter(item => idsItensCarrinho.includes(item.id));
  
  // CONTAGEM DE ITENS POR QUANTIDADE DE IDs SELECIONADOS (IDs REPETIDOS)
  const countMap = {}
  idsItensCarrinho.forEach(idRep => {
      if(itensNoCarrinho.find(item => item.id === idRep)){
        countMap[idRep] = (countMap[idRep] || 0) + 1
      }
    })

  // REMOVER TODAS AS OCORRÊNCIAS DOS IDs DOS ITENS QUE FORAM SELECIONADOS 
  const removerCarrinho = (itemId) => {
    idsItensCarrinho = itensNoCarrinho.filter(item => item !== itemId);
    remover(itemId)
  };

    return(
      <Transition appear show={openModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-[#000000]/60" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center font-roboto">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="flex flex-col min-w-[90%] md:min-w-[660px] h-[500px] justify-between transform overflow-hidden rounded-[8px] bg-[#FFFFFF] p-6 text-center align-middle shadow-xl transition-all">
                  <div>
                    <Dialog.Title as="h3" className="w-full h-[38px] font-bold text-[24px] text-[#000000]">
                      Seu carrinho
                    </Dialog.Title>
                    <div className='w-full h-[260px] overflow-auto px-[5px]'>
                      {itensNoCarrinho.length > 0 ? (
                        itensNoCarrinho.map((item) => (
                          <ModalPedidos
                            key={item.id}
                            id={item.id}
                            titulo={item.titulo}
                            quantidade={countMap[item.id]}
                            total={(parseFloat(item.preco) * (countMap[item.id])).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                            removerCarrinho={() => removerCarrinho(item.id)}
                          /> 
                        ))
                      ) : (
                        <div className='flex items-center justify-center w-full h-full'>
                          <p className='font-bold text-[20px] text-[#000000]'>Seu carrinho está vazio</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <div className='w-full mt-3 font-medium text-[18px] text-[#000000]'>
                      <p className='text-left'>Endereço de entrega:</p>
                      <input className='w-full h-[45px] rounded-[4px] px-[8px] border-[1.5px] border-[#C9C9C9] placeholder:text-[#C1C1C1]' type='text' name='endereco' placeholder='Digite seu endereço completo...'></input>
                    </div>

                    <div className="flex flex-row justify-between mt-8">
                      <button type='button' className='font-medium text-[16px] text-[#000000]' onClick={closeModal}>Fechar</button>
                      <button
                        type="button"
                        className="font-bold w-[191px] h-[34px] rounded-[4px] text-[16px] text-[#FFFFFF] bg-[#54CC0A]"
                        onClick={closeModal}
                      >
                        Finalizar pedido
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    )
}