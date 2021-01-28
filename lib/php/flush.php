<?php

// old file functions
// function makeFolder( $name ) {
//   if ( !file_exists( $name ) )mkdir( $name, 0777, true );
// }
// function deleteDir( $dirPath ) {
//   if ( !is_dir( $dirPath ) ) return false;
//   if ( substr( $dirPath, strlen( $dirPath ) - 1, 1 ) != '/' )$dirPath .= '/';
//   $files = glob( $dirPath . '*', GLOB_MARK );
//   foreach ( $files as $file ) {
//     if ( is_dir( $file ) )deleteDir( $file );
//     else unlink( $file );
//   }
//   rmdir( $dirPath );
// }
// function folderEmpty( $dir ) {
//   if ( !is_readable( $dir ) ) return NULL;
//   return ( count( scandir( $dir ) ) == 2 );
// }
//
// if(!folderEmpty("tmp")) {
//   deleteDir("tmp");
//   makeFolder("tmp");
// }

// flush the cache
/* TODO: each user has their own tmp folder
and it clears every so often or when they manually clear it */
$files = Files::getInstance();
if(!$files->empty("tmp")) {
  $files->delete("tmp");
  $files->dir("tmp");
}
