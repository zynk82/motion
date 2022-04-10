{
    function Log(_: any, name: string, descriptor: PropertyDescriptor): PropertyDescriptor {
        const newDescriptor = {
            ...descriptor,
            value: function (...args: any[]): any {
                console.log(_);
                console.dir(`[LOG]CALLING ${name} WITH ARGUMENTS : ${args}`);
                const result = descriptor.value.apply(this, args);
                console.dir(`[LOG]RESULT : ${result}`);
                return result;
            }
        }

        return newDescriptor;
    }

    class Calculator {
        @Log
        add(x: number, y: number): number {
            return x + y;
        }
    }

    console.log(new Calculator().add(1, 2));
}