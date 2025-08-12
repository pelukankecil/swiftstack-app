import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignatureCanvas from "@/components/SignatureCanvas";
import FileUpload from "@/components/FileUpload";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [canvasSignature, setCanvasSignature] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState('gambar');
  const { toast } = useToast();

  const handleSave = () => {
    if (activeTab === 'gambar' && canvasSignature) {
      // Here you would typically save the signature to your backend
      console.log('Saving canvas signature:', canvasSignature);
      toast({
        title: "Tanda tangan berhasil disimpan",
        description: "Tanda tangan Anda telah disimpan dengan aman.",
      });
    } else if (activeTab === 'unggah' && uploadedFile) {
      // Here you would typically upload the file to your backend
      console.log('Saving uploaded file:', uploadedFile);
      toast({
        title: "File berhasil disimpan",
        description: `File ${uploadedFile.name} telah disimpan dengan aman.`,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Tidak ada tanda tangan",
        description: "Silakan buat tanda tangan atau unggah file terlebih dahulu.",
      });
    }
  };

  const hasSignature = () => {
    return (activeTab === 'gambar' && canvasSignature) || 
           (activeTab === 'unggah' && uploadedFile);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl font-semibold text-foreground">
              Masukan Tanda Tangan
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Anda belum memiliki tanda tangan dalam blockchain
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="gambar">Gambar</TabsTrigger>
                <TabsTrigger value="unggah">Unggah</TabsTrigger>
              </TabsList>
              
              <TabsContent value="gambar" className="space-y-4">
                <div className="space-y-2">
                  <SignatureCanvas onSignatureChange={setCanvasSignature} />
                  <p className="text-xs text-muted-foreground text-center">
                    Gambar tanda tangan Anda di area di atas
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="unggah" className="space-y-4">
                <FileUpload onFileSelect={setUploadedFile} maxSizeMB={10} />
                <p className="text-xs text-muted-foreground text-center">
                  Hanya mendukung file .png
                </p>
              </TabsContent>
            </Tabs>

            <div className="pt-4">
              <p className="text-xs text-muted-foreground mb-4">
                Dengan mendatangi dan menandatangani dokumen ini, tanda tangan Anda akan ditunggah ke dalam blockchain Mandala kami untuk penyimpanan yang aman dan permanen.
              </p>
              
              <Button 
                onClick={handleSave}
                disabled={!hasSignature()}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3"
              >
                Simpan
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;