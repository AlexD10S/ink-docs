---
title: Almacenando Valores
slug: /basics/storing-values
---

Así es como se almacenan valores simples en el `storage`:

```rust
#[ink(storage)]
pub struct MyContract {
    // Store a bool
    my_bool: bool,
    // Store some number
    my_number: u32,
}
/* --snip-- */
```

## Tipos Soportados

Los contratos de Substrate pueden almacenar tipos que sean codificables y decodificables con [Parity Codec](https://github.com/paritytech/parity-codec) 
que incluye la mayoría de los tipos de datos comunes de Rust, como `bool`, `u{8,16,32,64,128}`, `i{8,16,32,64,128}`, `String`, tuplas, y arrays.

ink! proporciona tipos específicos como `AccountId`, `Balance`, y `Hash` para smart contracts como si fuesen tipos primitivos.

ink! también proporciona el tipo de storage `Mapping`. Puedes leer más sobre este tipo [aquí](/datastructures/mapping).

Aquí tienes un ejemplo de como puedes almacenar un `AccountId` y `Balance`:

```rust
// We are importing the default ink! types
use ink_lang as ink;

#[ink::contract]
mod MyContract {

    // Our struct will use those default ink! types
    #[ink(storage)]
    pub struct MyContract {
        // Store some AccountId
        my_account: AccountId,
        // Store some Balance
        my_balance: Balance,
    }
    /* --snip-- */
}
```

## Inicializar Storage en Constructores

Constructores es cómo se inicializan los valores
Cada ink! smart contract debe tener un constructor que se ejecuta una vez cuando el contrato es creado. Los ink! smart contracts pueden tener múltiples constructores:

Tenga en cuenta que si tiene un contrato cuyo almacenamiento contiene `Mapping'` también puedes utilizar
`ink_lang::utils::initialize_contract` en tu constructor. Mira la
[documentación de `Mapping`](/datastructures/mapping) para más detalles.

```rust
use ink_lang as ink;

#[ink::contract]
mod mycontract {

    #[ink(storage)]
    pub struct MyContract {
        number: u32,
    }

    impl MyContract {
        /// Constructor that initializes the `u32` value to the given `init_value`.
        #[ink(constructor)]
        pub fn new(init_value: u32) -> Self {
            Self {
                number: init_value,
            }
        }

        /// Constructor that initializes the `u32` value to the `u32` default.
        #[ink(constructor)]
        pub fn default() -> Self {
            Self {
                number: Default::default(),
            }
        }
    /* --snip-- */
    }
}
```
