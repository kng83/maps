
namespace Es2019{

    let arr = [1,23,3,34,[2,2,2],[[1,2,3],[56,3]]];
   // let flattedArr =  arr.flat(Infinity)
 //   console.log(flattedArr); //not supported by node

 let me:any;
  console.log(me?.some.steam); // zwraca undefined

  // nowy operator zamiast || jest lepszy bo mozna napisac foo.some gdy || to bylby error (i tak jest)
  let foo:any;
  const bar = () => 1;
  let x = foo ?? bar(); // if foo==undefined or null then  bar() else foo

  console.log(x);
  //--------------------------assertion
  
  function yell(str:any) {
    assert(typeof str === "string","to nie jest string");

    return (str as any).caseSelect();
    //         ~~~~~~~~~~~
    // error: Property 'toUppercase' does not exist on type 'string'.
    //        Did you mean 'toUpperCase'?
}

function assert(condition: any, msg?: string): asserts condition {
    if (!condition) {
        throw new Error(msg)
    }
}

  yell(23);
}