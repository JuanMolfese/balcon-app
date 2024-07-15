"use client"
import { useEffect, useState } from 'react';
import Slider from './Slider';
import Landing from './Landing';
import io from "socket.io-client";
import { useGetSucursalQuery } from '@/redux/services/sucursalApi';

const socket = io('http://localhost:3000');

// Hook para detectar el tamaño de la pantalla
const useMediaQuery = (query:any) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const documentChangeHandler = () => setMatches(mediaQueryList.matches);

    mediaQueryList.addEventListener('change', documentChangeHandler);

    // Verificar el estado inicial
    documentChangeHandler();

    return () => {
      mediaQueryList.removeEventListener('change', documentChangeHandler);
    };
  }, [query]);

  return matches;
};

const Welcome = () => {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1024px)');
  const isDesktop = useMediaQuery('(min-width: 1025px)');
  const {data: sucursal, isLoading, error, refetch} = useGetSucursalQuery(1);

  useEffect(() => {
    socket.on('updateSuc', () => {
        //console.log("Recieved from SERVER ::", data)
       refetch();
        // Execute any command
    })
  }, [refetch]);

  return (
    <div>
      {isMobile && (
        <div className="mobile-welcome">
          {/* Tu contenido para móviles */}          
          <Slider/>
        </div>
      )}

      {isTablet && (
        <div className="tablet-welcome">
          {/* Tu contenido para tablets */}
          <Landing estado={sucursal?.status_sucursal_id == 1}/>
        </div>
      )}

      {isDesktop && (
        <div className="desktop-welcome">
          {/* Tu contenido para escritorio */}
          <Landing estado={sucursal?.status_sucursal_id == 1}/>
        </div>
      )}
    </div>
  );
};

export default Welcome;