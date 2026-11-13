import React from 'react';
import { afterEach, expect, test, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import App from './App';
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });
test('filters illustrative rooms by budget and shows empty state', () => {
 render(<App />);
 expect(screen.getByText('La Floresta')).toBeTruthy();
 expect(screen.queryByText('Centro norte')).toBeNull();
 fireEvent.change(screen.getByLabelText('Presupuesto máximo'), { target: { value: '350' } });
 expect(screen.getByText('Centro norte')).toBeTruthy();
 fireEvent.change(screen.getByLabelText('Presupuesto máximo'), { target: { value: '150' } });
 expect(screen.getByText(/No hay habitaciones/)).toBeTruthy();
});
test('confirms a healthy API', async () => {
 vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ok:true,json:async()=>({status:'ok'})}));
 render(<App />); fireEvent.click(screen.getByText('Comprobar backend'));
 expect(await screen.findByText('Backend conectado')).toBeTruthy();
});
test('reports API failure instead of claiming success', async () => {
 vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));
 render(<App />); fireEvent.click(screen.getByText('Comprobar backend'));
 expect(await screen.findByText(/Backend no disponible/)).toBeTruthy();
});
