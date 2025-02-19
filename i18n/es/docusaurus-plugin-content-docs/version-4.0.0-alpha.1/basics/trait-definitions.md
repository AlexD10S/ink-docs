---
title: Definiciones Trait
slug: /basics/trait-definitions
---

A través del proc. macro `#[ink::trait_definition]` ahora es posible definir tu propia trait definición que se pueden implementar en los ink! smart contracts.

Esto permite definir interfaces de smart contracts compartidas para diferentes implementaciones concretas.
Tenga en cuenta que que esta definición trait de ink! puede ser definida en cualquier lugar, incluso en otro crate!

Vea nuestro [`ERC20-Trait contracto de ejemplo`](https://github.com/paritytech/ink/blob/master/examples/trait-erc20/lib.rs) 
para un elaborado ejemplo que utiliza definiciones trait.

### Ejemplo

Definido en el módulo `base_erc20.rs`.

```rust
use ink_lang as ink;

#[ink::trait_definition]
pub trait BaseErc20 {
    /// Crear un nuevo contrato ERC-20 e inicializa con un suministro inicial para el instanciador.
    #[ink(constructor)]
    fn new(initial_supply: Balance) -> Self;

    /// Devuelve el suministro total.
    #[ink(message)]
    fn total_supply(&self) -> Balance;

    /// Transfiere `amount` de la persona que llama el contrato a `to`.
    #[ink(message, payable)]
    fn transfer(&mut self, to: AccountId, amount: Balance);
}
```

Una definición de un ink! smart contract puede implementar esta definición trait así:

```rust
use ink_lang as ink;

#[ink::contract]
mod erc20 {
    use base_erc20::BaseErc20;

    #[ink(storage)]
    pub struct Erc20 {
        total_supply: Balance,
        // más campos ...
    }

    impl BaseErc20 for Erc20 {
        #[ink(constructor)]
        fn new(initial_supply: Balance) -> Self {
            // implementación ...
        }

        #[ink(message)]
        fn total_supply(&self) -> Balance {
            // implementación ...
        }

        #[ink(message, payable)]
        fn transfer(&mut self, to: AccountId, amount: Balance) {
            // implementación ...
        }
    }
}
```

Llamar el `Erc20` de arriba explicitamente mediante su implementación trait se puede haver como un código Rust normal:

```rust
// --- Instanciando el contrato ERC-20:
//
let mut erc20 = <Erc20 as BaseErc20>::new(1000);
// --- Es solo el mismo como:
use base_erc20::BaseErc20;
let mut erc20 = Erc20::new(1000);

// --- Recuperando el suministro total:
//
assert_eq!(<Erc20 as BaseErc20>::total_supply(&erc20), 1000);
// --- Es simplemente lo mismo como:
use base_erc20::BaseErc20;
assert_eq!(erc20.total_supply(), 1000);
```

Aún existen algunas limitaciones con las ink! trait definiciones y las ink! trait implementaciones.
Por ejemplo no es posible definir constantes asociadas o tipos o tampoco es posible tener métodos implementados por defecto.
Estas limitaciones existen debido a las complejidades técnicas, sin embargo muchas de ellas se van a abordar en un futuros lanzamientos de ink!.




Marca definiciones trait para ink! como ink! trait definiciones especiales.

Hay algunas restricciones para las definiciones trait de ink! que este macro comprueba. Además las definiciones trait de ink! son necesarias para 
tener una estructura especializada y que la principial macro [`#[ink::contract]`](https://docs.rs/ink_lang/3.3.1/ink_lang/attr.contract.html) pueda generar correctamente código para su implementación.

# Ejemplo: Definición

```rust
use ink_lang as ink;
type Balance = <ink_env::DefaultEnvironment as ink_env::Environment>::Balance;

#[ink::trait_definition]
pub trait Erc20 {
    /// Construye un nuevo ERC-20 smart contract utilizando el sumunistro inicial.
    #[ink(constructor)]
    fn new(initial_supply: Balance) -> Self;

    /// Devuelve el suministro total del smart contract ERC-20.
    #[ink(message)]
    fn total_supply(&self) -> Balance;

    // etc.
}
```

# Ejemplo: Implementación

Con la definición trait de arriba puedes implementarla como se muestra a continuación:

```rust
use ink_lang as ink;

#[ink::contract]
mod base_erc20 {
    /// De alguna manera no podemos poner el trait el el doc-test crate root debido a bugs.
    #[ink_lang::trait_definition]
    pub trait Erc20 {
        /// Construye un nuevo ERC-20 smart contract utilizando el sumunistro inicial.
        #[ink(constructor)]
        fn new(initial_supply: Balance) -> Self;

        /// Devuelve el suministro total del smart contract ERC-20.
        #[ink(message)]
        fn total_supply(&self) -> Balance;
    }

    #[ink(storage)]
    pub struct BaseErc20 {
        total_supply: Balance,
        // etc ..
    }

    impl Erc20 for BaseErc20 {
        #[ink(constructor)]
        fn new(initial_supply: Balance) -> Self {
            Self { total_supply: initial_supply }
        }

        /// Devuelve el suministro total del smart contract ERC-20.
        #[ink(message)]
        fn total_supply(&self) -> Balance {
            self.total_supply
        }

        // etc ..
    }
}
```


