import { AbstractControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";


export function validarLimitePaginasLidas(formGroup: FormGroup): ValidationErrors | null {
    const totalPaginas = formGroup.get('totalPaginas')
    const paginasLidas = formGroup.get('paginasLidas')

    if (Number(paginasLidas?.value) > Number(totalPaginas?.value)) {
        return { paginasLidasMaiorQueTotal: true };
    }
    else {
        return null;
    }
}


export class VerificadorErroPaginasLidas implements ErrorStateMatcher {
    isErrorState(control: AbstractControl | null, form: FormGroupDirective | NgForm | null): boolean {
      return ((control?.invalid || form?.hasError('paginasLidasMaiorQueTotal') ) && control?.touched) ?? false;
    }
}
