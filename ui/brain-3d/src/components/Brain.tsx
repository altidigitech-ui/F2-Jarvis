import { BRAIN_REGIONS } from "../lib/zones";
import { Region } from "./Region";

/**
 * Le cerveau complet : toutes les régions + enveloppe extérieure semi-transparente
 * qui suggère la forme anatomique du cerveau.
 *
 * V1 = structure en sphères. V2 = modèle GLB anatomique réaliste (chargé via useGLTF
 * avec un modèle CC0 type BrainGL ou Sketchfab CC-BY).
 */
export function Brain() {
  return (
    <group>
      {/* Enveloppe cerveau — forme approximative (ellipsoïde) */}
      <mesh>
        <sphereGeometry args={[2, 48, 48]} />
        <meshStandardMaterial
          color="#f5f7ff"
          transparent
          opacity={0.04}
          roughness={0.9}
          wireframe={false}
        />
      </mesh>

      {/* Wireframe interne pour donner du volume */}
      <mesh>
        <sphereGeometry args={[1.95, 24, 24]} />
        <meshBasicMaterial
          color="#3b4fd8"
          wireframe
          transparent
          opacity={0.08}
        />
      </mesh>

      {/* Sillon central (approximation esthétique) */}
      <mesh rotation={[0, 0, 0]}>
        <torusGeometry args={[1.9, 0.02, 8, 80]} />
        <meshBasicMaterial color="#52525b" transparent opacity={0.4} />
      </mesh>

      {/* Régions anatomiques */}
      {BRAIN_REGIONS.map((region) => (
        <Region key={region.id} region={region} />
      ))}
    </group>
  );
}
