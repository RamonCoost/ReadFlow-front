import { MatPaginatorIntl } from '@angular/material/paginator';

export function PaginatorIntlTs() {

  const paginatorIntl = new MatPaginatorIntl();

  paginatorIntl.itemsPerPageLabel = 'Itens por página:';
  paginatorIntl.nextPageLabel = 'Próxima página:';
  paginatorIntl.previousPageLabel = 'Página anterior';
  paginatorIntl.getRangeLabel = (page, pageSize, length) => {
    if (length === 0) {
      return `0 de 0`
    }
      const inicio = (page * pageSize) + 1;
      const fimTeorico = (page + 1) * pageSize;
      const fim = Math.min(fimTeorico, length);

      return `${inicio} - ${fim} de ${length}`
  }

  return paginatorIntl;
}
