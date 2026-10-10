import { sumar } from './utils';

// 1. Tipado estático
{
  console.log("1. Tipado estático");

  let productoNombre: string = "Laptop";
  let productoPrecio: number = 1200;
  let productoEnStock: boolean = true;

  console.log(productoNombre, productoPrecio, productoEnStock);

  // ❌ El editor te mostrará un error aquí
  // productoPrecio = "mil doscientos";
}

// 2. Tipo any y unknown
{
  console.log("2. Tipo any y unknown");

  let datosAPI: unknown = JSON.parse('{"nombre": "tablet", "precio": 300}');

  if (typeof datosAPI === 'object' && datosAPI !== null) {
    // ✅ Comprobación para acceder de forma segura
    let producto = datosAPI as { nombre: string, precio: number };
    console.log(producto.nombre);
  }
}

// 3. Tipo void y never en funciones
{
  console.log("3. Tipo void y never en funciones");

  function registrarMensaje(mensaje: string): void {
    console.log("LOG:", mensaje);
  }

  function detenerProceso(razon: string): never {
    throw new Error(`Proceso detenido: ${razon}`);
  }
  
  registrarMensaje("Todo funciona");
  //detenerProceso("error fatal");
}

// 4. Arrays, tuplas y enumeradores
{
  console.log("4. Arrays, tuplas y enumeradores");

  let usuariosIDs: number[] = [101, 102, 103];
  let gpsCoordenadas: [number, number] = [40.7128, -74.0060];

  enum EstadoOrden { Pendiente, Enviada, Entregada, Cancelada };
  let miOrdenEstado: EstadoOrden = EstadoOrden.Enviada;

  console.log(usuariosIDs, gpsCoordenadas, miOrdenEstado);
}

// 5. Union types, type aliases e intersection types
{
  console.log("5. Union types, type aliases e intersection types");

  type ID = string | number;
  let miId: ID = "a-123";

  type Empleado = { nombre: string, email: string };
  type Desarrollador = Empleado & { lenguaje: string, senioridad: "junior" | "senior" };

  let nuevoDev: Desarrollador = {
    nombre: "Carlos",
    email: "carlos@empresa.com",
    lenguaje: "TypeScript",
    senioridad: "junior"
  };

  console.log(miId, nuevoDev);
}

// 6. Parámetros de funciones
{
  console.log("6. Parámetros de funciones");

  function saludar(nombre: string = 'Desconocido', titulo?: string, ...amigos: string[]): string {
    let saludo = titulo ? `${titulo} ${nombre}` : nombre;
    if (amigos.length > 0) {
      saludo += `, y tus amigos ${amigos.join(', ')}`;
    }
    return `Hola, ${saludo}.`;
  }

  console.log(saludar());  // Hola, Desconocido
  console.log(saludar("Ana")); // Hola, Ana
  console.log(saludar("Pedro", "Sr.")); // Hola, Sr. Pedro
  console.log(saludar("Maria", undefined, "Juan", "Pedro")); // Hola, Maria, y tus amigos Juan, Pedro
  console.log(saludar(undefined, undefined, "Juan", "Pedro")); // Hola, Desconocido, y tus amigos Juan, Pedro
}

// 7. Interfaces y propiedades
{
  console.log("7. Interfaces y propiedades");

  interface Usuario {
    readonly id: number;
    nombre: string;
    email?: string;
  }

  let usuario: Usuario = { id: 10, nombre: "Luis" };
  // usuario.id = 11; // ❌ Error, es de solo lectura
  usuario.email = "luis@correo.com"; // ✅ Válido

  console.log(usuario);
}

// 8. Clases y modificadores de acceso
{
  console.log("8. Clases y modificadores de acceso");

  class Vehiculo {
    protected ruedas: number;
    constructor(ruedas: number) {
      this.ruedas = ruedas;
    }
    public arrancar(): void {
      console.log("El vehículo está arrancando.");
    }
  }

  class Coche extends Vehiculo {
    public marca: string;
    private _velocidad: number = 0;

    constructor(ruedas: number, marca: string) {
      super(ruedas);
      this.marca = marca;
    }

    // Puedes acceder a 'this.ruedas' porque es 'protected'
    public getInfo(): void {
      console.log(`Este coche tiene ${this.ruedas} ruedas.`);
    }

    // Métodos que manipulan la propiedad 'private'
    public acelerar(cantidad: number): void {
      this._velocidad += cantidad;
    }
  }

  const miCoche = new Coche(4, "Toyota");
  miCoche.arrancar();
  miCoche.acelerar(50);
  // miCoche._velocidad = 100; // ❌ Error, es privado

  console.log(miCoche);
}

// 9. Tipos genéricos
{
  console.log("9. Tipos genéricos");

  class ColaString {
    private items: string[] = [];

    agregar(item: string): void {
      this.items.push(item);
    }
    obtenerPrimerElemento(): string | undefined {
      return this.items.shift();
    }
  }

  class ColaNumber {
    private items: number[] = [];

    agregar(item: number): void {
      this.items.push(item);
    }
    obtenerPrimerElemento(): number | undefined {
      return this.items.shift();
    }
  }

  class Cola<T> {
    private items: T[] = [];

    agregar(item: T): void {
      this.items.push(item);
    }

    obtenerPrimerElemento(): T | undefined {
      return this.items.shift();
    }
  }

  const colaNumeros = new Cola<number>();
  colaNumeros.agregar(10);
  colaNumeros.agregar(20);
  const primerNumero = colaNumeros.obtenerPrimerElemento(); // Tipo: number
  console.log(primerNumero);

  const colaCadenas = new Cola<string>();
  colaCadenas.agregar('Pepe');
  colaCadenas.agregar('Maria');
  const primerNombre = colaCadenas.obtenerPrimerElemento(); // Tipo: string
  console.log(primerNombre);
}

// 10. Módulos
{
  console.log("10. Módulos");

  const resultado = sumar(5, 10);
  console.log(`El resultado de la suma es: ${resultado}`);
}