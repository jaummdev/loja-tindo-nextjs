# Projeto E-commerce Loja Tindo - Next JS

Este projeto é uma aplicação web de e-commerce que integra uma API para gerenciamento dinâmico de configurações, galerias e itens. Ele foi desenvolvido com Next JS (com TypeScript), Next UI e Tailwind CSS, utilizando boas práticas de programação.

---

## Estrutura do Projeto

### **Arquivos Principais**

- **`/app/page.tsx`**
  - Arquivo principal que gerencia a exibição dinâmica de páginas com base nas pastas '/app/carrinho' = /carrinho.
  - Inclui componentes como cabeçalho, rodapé e botão flutuante dinâmico.

-  **`/services/apiTindo.ts`**
  - Gerencia chamadas à API externa.
  - Realiza requisições para carregar dados de configuração e galeria, utilizando Axios.

- **`/app/visualizar/[tipo]/[id]/page.tsx`**
  - Detalhamento de um item específico da galeria.
  - Permite ao usuário selecionar quantidade, data, horário e local de embarque.
  - Exibe informações detalhadas sobre o item.

- **`/app/carrinho/page.tsx`**
  - Gerencia itens adicionados ao carrinho.
  - Exibe um resumo com a quantidade total e preço final.
  - Permite limpar o carrinho ou finalizar a compra.
  - Utilizando Localstorage do navegador como armazenamento de informações do item.

---

## Tecnologias Utilizadas

### **Frontend**
- **Next JS**
- **Next UI**
- **Tailwind CSS**
- **Material Tailwind**
- **React Icons/Fa6 (Font Awesome)**

### **APIs**
- **API Tindo**: Fornece dados de configuração e galeria.

---

## Funcionalidades

1. **Carrossel Dinâmico**:
   - Exibe imagens configuradas na API.
   - Suporte a navegação por botões e indicadores.

2. **Galeria de Produtos**:
   - Lista itens com imagens, títulos, preços e botões de ação.
   - Utiliza cores e temas definidos na configuração.

3. **Página de Detalhes**:
   - Apresenta informações detalhadas de cada item.
   - Permite configuração de compra personalizada (quantidade, data, local).

4. **Carrinho de Compras**:
   - Adiciona e gerencia itens.
   - Mostra resumo com cálculo de total.

5. **Responsividade**:
   - Layout otimizado para dispositivos móveis e desktop.

---

Feito com ❤️ por [Jaumm Dev.](https://www.jaummdev.com.br)