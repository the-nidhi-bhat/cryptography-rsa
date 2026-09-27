# RSA Cryptography

## Mathematics Behind Secure Communication

RSA Cryptography is an educational web-based project developed to demonstrate how **mathematics and number theory are used in modern cryptography and secure communication**.

The project explains the working principles of the **RSA encryption algorithm**, including prime numbers, modular arithmetic, public and private keys, encryption, and decryption. It also introduces the **Hill Cipher** to demonstrate another mathematical approach to cryptography.

The project was developed and presented as part of a **National Mathematics Day University-Level Model Presentation/Exhibition**, where it received **3rd Prize**.

---

# Problem Statement

In the digital world, sensitive information such as passwords, messages, financial information, and personal data needs to be protected from unauthorized access.

Cryptography provides mathematical techniques for securing information, but many students encounter cryptography as a complex theoretical topic.

The project aims to make the mathematical concepts behind cryptography easier to understand through an **interactive and visual learning platform**.

---

# Our Solution

The RSA Cryptography project demonstrates how mathematical concepts can be transformed into a practical security mechanism.

The project explains:

* Prime numbers
* Number theory
* Modular arithmetic
* Greatest Common Divisor (GCD)
* Euler's Totient Function
* Public and private keys
* RSA key generation
* Encryption
* Decryption
* Hill Cipher fundamentals

The project connects these mathematical concepts to their role in **secure digital communication**.

---

# What is RSA?

RSA is a **public-key cryptographic algorithm** that uses two different keys:

```text
Public Key
    ↓
Used for Encryption

Private Key
    ↓
Used for Decryption
```

The two keys are mathematically related but serve different purposes.

RSA derives its security from mathematical properties related to the difficulty of factoring large composite numbers.

---

# Mathematical Foundation

RSA relies heavily on concepts from number theory.

## 1. Prime Numbers

RSA begins with two prime numbers:

```text
p
q
```

These primes are used to calculate:

```text
n = p × q
```

The value `n` becomes part of the public and private key structure.

---

## 2. Euler's Totient Function

For two distinct prime numbers:

```text
φ(n) = (p - 1)(q - 1)
```

The value of Euler's Totient Function is used during RSA key generation.

---

## 3. Public Key

The public key consists of:

```text
(e, n)
```

where:

* `e` is the public exponent
* `n` is the product of the two prime numbers

The public key can be shared with others.

---

## 4. Private Key

The private key consists of:

```text
(d, n)
```

where `d` is calculated using the modular inverse of `e` with respect to `φ(n)`.

The private key must remain secret.

---

# RSA Key Generation

The basic RSA key-generation process is:

```text
Choose two prime numbers
        ↓
      p, q
        ↓
Calculate n = p × q
        ↓
Calculate φ(n)
        ↓
Choose public exponent e
        ↓
Calculate private exponent d
        ↓
Generate Keys
```

The resulting keys are:

```text
Public Key  → (e, n)

Private Key → (d, n)
```

---

# RSA Encryption

For a message represented as `m`, RSA encryption is represented by:

```text
c = m^e mod n
```

where:

* `m` = original message
* `e` = public exponent
* `n` = modulus
* `c` = encrypted message

The resulting value `c` is the ciphertext.

---

# RSA Decryption

The encrypted message can be decrypted using the private key:

```text
m = c^d mod n
```

where:

* `c` = ciphertext
* `d` = private exponent
* `n` = modulus
* `m` = original message

Conceptually:

```text
Original Message
       ↓
    Encryption
       ↓
   Ciphertext
       ↓
    Decryption
       ↓
Original Message
```

---

# Example

A simplified RSA example can be represented using small prime numbers for educational purposes.

Suppose:

```text
p = 5
q = 11
```

Then:

```text
n = 5 × 11
  = 55
```

Euler's Totient:

```text
φ(n) = (5 - 1)(11 - 1)
     = 4 × 10
     = 40
```

A suitable public exponent can then be selected such that it is relatively prime to `φ(n)`.

The corresponding private exponent is calculated using the modular inverse.

This demonstrates how the mathematical components of RSA are connected.

> Small numbers are used only for demonstration. Real RSA uses very large key sizes and optimized algorithms.

---

# Hill Cipher

Along with RSA, the project introduces the **Hill Cipher**, another cryptographic technique based on mathematics.

The Hill Cipher uses **matrix operations and modular arithmetic** to transform plaintext into ciphertext.

The basic concept is:

```text
Plaintext
    ↓
Convert characters to numbers
    ↓
Matrix Multiplication
    ↓
Modulo Operation
    ↓
Ciphertext
```

This demonstrates how concepts from **linear algebra and modular arithmetic** can be applied to cryptography.

---

# Key Features

## Interactive Learning

The project presents cryptography concepts in a structured and easy-to-understand format.

## RSA Explanation

Explains the mathematical process behind RSA from key generation to encryption and decryption.

## Mathematical Concepts

Covers:

* Prime numbers
* Modular arithmetic
* Number theory
* Euler's Totient Function
* Modular inverse

## Public & Private Keys

Demonstrates the difference between public and private keys and their respective roles.

## Encryption & Decryption

Shows how mathematical operations transform plaintext into ciphertext and back.

## Hill Cipher

Introduces matrix-based encryption as another example of mathematical cryptography.

---

# Project Architecture

The conceptual flow of the project is:

```text
                 RSA CRYPTOGRAPHY
                        |
          +-------------+-------------+
          |                           |
          v                           v
   Mathematical Concepts       Cryptography Concepts
          |                           |
          v                           v
  Number Theory              Public / Private Keys
  Prime Numbers                       |
  Modular Arithmetic                  v
  Euler's Totient              Encryption
  Modular Inverse                     |
                                      v
                                  Decryption
```

---

# User Flow

The educational flow of the website is:

```text
Start
  ↓
Introduction to Cryptography
  ↓
Learn Mathematical Concepts
  ↓
Understand RSA
  ↓
Key Generation
  ↓
Encryption
  ↓
Decryption
  ↓
Explore Hill Cipher
  ↓
Understand Applications
```

---

# Technology

The project is designed as a web-based educational application.

### Frontend

* HTML
* CSS
* JavaScript

### Core Concepts

* Number Theory
* Modular Arithmetic
* Matrix Mathematics
* Cryptography

The implementation can be extended using modern web frameworks and cryptographic libraries for more advanced functionality.

---

# Applications of RSA

RSA is historically important in public-key cryptography and has been used in areas such as:

* Secure communication
* Digital signatures
* Authentication
* Key exchange systems
* Digital certificates
* Secure data transmission

Modern cryptographic systems often combine asymmetric cryptography with other cryptographic techniques rather than using RSA alone for bulk data encryption.

---

# RSA vs Hill Cipher

| Feature            | RSA                                                   | Hill Cipher                                |
| ------------------ | ----------------------------------------------------- | ------------------------------------------ |
| Type               | Public-key cryptography                               | Classical symmetric cipher                 |
| Mathematical basis | Number theory                                         | Matrix mathematics                         |
| Keys               | Public + Private                                      | Shared key                                 |
| Main concepts      | Prime numbers, modular arithmetic                     | Matrices, modular arithmetic               |
| Modern relevance   | Historically important and still used in some systems | Primarily educational/classical            |
| Purpose in project | Demonstrate modern cryptographic mathematics          | Demonstrate mathematical cipher techniques |

---

# Educational Objectives

The project was designed to demonstrate:

1. How mathematics contributes to cybersecurity.
2. How prime numbers are used in cryptography.
3. How modular arithmetic enables cryptographic operations.
4. How public and private keys work.
5. How encryption and decryption are mathematically connected.
6. How matrices can be used for classical encryption.
7. How abstract mathematical concepts can be demonstrated through an interactive application.

---

# Project Demonstration

The demonstration follows a simple progression:

```text
Mathematics
     ↓
Number Theory
     ↓
RSA Key Generation
     ↓
Public Key
     ↓
Encryption
     ↓
Ciphertext
     ↓
Private Key
     ↓
Decryption
     ↓
Original Message
```

This allows viewers to understand the connection between **mathematical theory and practical cybersecurity**.

---

# Achievement

The project was presented at a **National Mathematics Day University-Level Model Presentation/Exhibition**.

### Achievement

**3rd Prize – University-Level Model Presentation/Exhibition**

The project demonstrated the application of mathematical concepts to cryptography and cybersecurity.

---

# Project Impact

The main purpose of the project was to make cryptography more understandable by connecting mathematical theory with a practical application.

Instead of treating concepts such as modular arithmetic, prime numbers, and matrices as isolated mathematical topics, the project demonstrates how they can contribute to information security.

---

# Future Scope

The project can be extended with:

### Interactive RSA Simulator

Allow users to enter values and observe RSA key generation, encryption, and decryption step by step.

### Visualization

Add visual representations of:

* Key generation
* Modular arithmetic
* Encryption
* Decryption

### Larger Key Demonstration

Demonstrate the difference between educational small-number RSA and real-world RSA key sizes.

### Digital Signature Demonstration

Extend the project to explain how RSA can be used for digital signatures and authentication.

### Additional Classical Ciphers

Add:

* Caesar Cipher
* Vigenère Cipher
* Playfair Cipher
* Affine Cipher

### Cryptography Comparison

Provide an educational comparison between classical and modern cryptographic techniques.

---

# Important Security Note

This project is primarily an **educational demonstration of cryptography**.

The simplified mathematical examples are intended to explain how RSA works and should **not be used for protecting real confidential information**.

Real-world cryptographic systems use carefully designed algorithms, secure implementations, sufficiently large key sizes, secure random number generation, and standardized protocols.

---

# Project Status

**Status:** Completed

**Project Type:** Educational Web-Based Cryptography Project

**Domain:** Mathematics / Cryptography / Cybersecurity

**Event:** National Mathematics Day

**Achievement:** 3rd Prize – University-Level Model Presentation/Exhibition

---

# Keywords

`RSA`
`Cryptography`
`Cybersecurity`
`Number Theory`
`Prime Numbers`
`Modular Arithmetic`
`Euler Totient Function`
`Public Key Cryptography`
`Encryption`
`Decryption`
`Hill Cipher`
`Mathematics`
`Information Security`

---

# Conclusion

The RSA Cryptography project demonstrates how mathematical principles can be transformed into practical cryptographic techniques.

By exploring **prime numbers, modular arithmetic, Euler's Totient Function, public and private keys, encryption, decryption, and matrix-based cryptography**, the project provides an accessible introduction to the mathematical foundations of information security.

The project was successfully presented at the **National Mathematics Day University-Level Model Presentation/Exhibition**, where it received **3rd Prize**.
